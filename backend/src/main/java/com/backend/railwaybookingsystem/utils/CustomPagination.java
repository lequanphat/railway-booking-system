package com.backend.railwaybookingsystem.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class CustomPagination<T> {
    List<T> data;
    CustomPageMeta meta;

    public CustomPagination(Page<T> page) {
        this.data = page.getContent();
        this.meta = new CustomPageMeta(
                page.getPageable().getPageNumber(),
                page.getPageable().getPageSize(),
                page.getTotalElements()
        );
    }

    @Data
    @AllArgsConstructor
    static
    class CustomPageMeta {
        int pageNumber;
        int pageSize;
        long total;
    }
}
