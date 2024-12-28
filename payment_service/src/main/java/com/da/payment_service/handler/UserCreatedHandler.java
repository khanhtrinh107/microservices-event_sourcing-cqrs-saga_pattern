package com.da.payment_service.handler;

import com.da.payment_service.model.Account;
import com.da.payment_service.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserCreatedHandler {
    private final AccountService accountService;

    @KafkaListener(topics = "user-created", groupId = "payment-group")
    public void handleUserCreated(String userId) {
        Account account = new Account();
        account.setUserId(userId);
        account.setBalance(0);
        account.setCurrency("USD");
        account.setStatus("AVAILABLE");
        account.setAccountId(UUID.randomUUID().toString());
        accountService.save(account);
    }
}
