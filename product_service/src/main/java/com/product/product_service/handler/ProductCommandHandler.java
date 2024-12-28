package com.product.product_service.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.product.product_service.command.ProductCreatedCommand;
import com.product.product_service.command.ProductDeletedCommand;
import com.product.product_service.command.ProductUpdatedCommand;

public interface ProductCommandHandler {
    public void handleCreateProductCommand(ProductCreatedCommand productCreatedCommand) throws JsonProcessingException;
    public void handleUpdateProductCommand(ProductUpdatedCommand productUpdatedCommand) throws JsonProcessingException;
    public void handleDeleteProductCommand(ProductDeletedCommand productDeletedCommand) throws JsonProcessingException;
}
