package com.backend.railwaybookingsystem.strategies.payment.impl;

import com.backend.railwaybookingsystem.strategies.payment.PaymentStrategy;
import com.backend.railwaybookingsystem.strategies.payment.enums.PaymentType;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class PaypalStrategy implements PaymentStrategy {

    @Autowired
    private APIContext apiContext;

    @Override
    public String payment(Long orderId, Long amount) {
        log.info("Creating payment for order: " + orderId + " with amount: " + amount);
        Amount amountObj = new Amount();
        amountObj.setCurrency("USD");
        amountObj.setTotal(String.format("%.2f", amount / 100.0));

        Transaction transaction = new Transaction();
        transaction.setDescription("Order payment:" + orderId);
        transaction.setAmount(amountObj);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:3000/ticket-booking/callback?status=fail");
        redirectUrls.setReturnUrl("http://localhost:3000/ticket-booking/callback?status=success");
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment createdPayment = payment.create(apiContext);
            for (Links link : createdPayment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    log.info("Redirecting to: " + link.getHref());
                    return link.getHref();
                }
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }
        return "";
    }

    @Override
    public PaymentType getType() {
        return PaymentType.PAYPAL;
    }
}
