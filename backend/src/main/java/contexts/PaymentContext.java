package contexts;

import com.backend.railwaybookingsystem.strategies.PaymentStrategy;

public class PaymentContext {
    private final PaymentStrategy paymentStrategy;

    public PaymentContext(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public String executePayment(Long orderId, Long amount) {
        return paymentStrategy.payment(orderId, amount);
    }
}