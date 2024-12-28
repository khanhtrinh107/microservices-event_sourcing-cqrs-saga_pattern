package com.da.shipment_service.controller;

import com.da.shipment_service.entity.Address;
import com.da.shipment_service.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAddressByUserId(@PathVariable("userId") String userId) {
        return new ResponseEntity<>(addressService.getAddressByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable("id") String id) {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> getAddressByUserId(@RequestBody Address address) {
        return new ResponseEntity<>(addressService.saveAddress(address), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateAddress(@RequestBody Address address) {
        return new ResponseEntity<>(addressService.saveAddress(address), HttpStatus.OK);
    }

}
