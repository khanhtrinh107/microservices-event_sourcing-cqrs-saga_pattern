package com.da.shipment_service.service.impl;

import com.da.shipment_service.entity.Address;
import com.da.shipment_service.repository.AddressRepository;
import com.da.shipment_service.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    @Override
    public Optional<Address> getAddressById(String id) {
        return addressRepository.findById(id);
    }

    @Override
    public Optional<List<Address>> getAddressByUserId(String userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public void deleteAddress(String addressId) {
        addressRepository.deleteById(addressId);
    }
}
