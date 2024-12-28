package com.da.payment_service.service;

import com.da.payment_service.model.Account;

import java.util.Optional;

public interface AccountService {
    Optional<Account> findByUserId(String userId);
    Account save(Account account);
}
