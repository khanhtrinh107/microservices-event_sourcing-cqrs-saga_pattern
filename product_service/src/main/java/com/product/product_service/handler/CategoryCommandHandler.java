package com.product.product_service.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.product.product_service.command.CategoryCreated;
import com.product.product_service.command.CategoryDeleted;
import com.product.product_service.command.CategoryUpdated;

public interface CategoryCommandHandler {
    public void handleCategoryCommand(CategoryCreated category) throws JsonProcessingException;
    public void handleCategoryUpdatedCommand(CategoryUpdated category) throws JsonProcessingException;
    public void handleCategoryDeletedCommand(CategoryDeleted category) throws JsonProcessingException;
}
