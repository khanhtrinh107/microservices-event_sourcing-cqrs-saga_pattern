package com.da.shipment_service.service;

import com.da.shipment_service.entity.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    Optional<Address> getAddressById(String id);
    Optional<List<Address>> getAddressByUserId(String userId);
    Address saveAddress(Address address);
    void deleteAddress(String addressId);
}
