package com.da.payment_service.service.impl;

import com.da.payment_service.model.Account;
import com.da.payment_service.repository.AccountRepository;
import com.da.payment_service.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    @Override
    public Optional<Account> findByUserId(String userId) {
        return accountRepository.findByUserId(userId);
    }

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }
}
