package com.da.payment_service.controller;

import com.da.payment_service.dto.RechargeRequest;
import com.da.payment_service.model.Account;
import com.da.payment_service.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountByUserId(@PathVariable String id) {
        return new ResponseEntity<>(accountService.findByUserId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> rechargeAccount(@RequestBody RechargeRequest request) {
        Account account = accountService.findByUserId(request.getUserId()).orElse(null);
        if (account != null) {
           account.setBalance(account.getBalance() + request.getBalance());
           account.setUpdatedAt(Instant.now());
           return new ResponseEntity<>(accountService.save(account), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
