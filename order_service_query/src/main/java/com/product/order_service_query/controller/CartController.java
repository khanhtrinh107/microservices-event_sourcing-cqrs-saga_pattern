package com.product.order_service_query.controller;

import com.product.order_service_query.dto.CartItem;
import com.product.order_service_query.model.Cart;
import com.product.order_service_query.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartRepository cartRepository;

    @PostMapping("/{id}")
    public ResponseEntity<?> addToCart(@PathVariable String id, @RequestBody CartItem cartItem) {
        Cart cart = cartRepository.findById(id).orElse(null);
        if (cart != null) {
            if(cart.getItems().containsKey(cartItem.getId())) {
                CartItem item = cart.getItems().get(cartItem.getId());
                item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                cart.getItems().put(cartItem.getId(), item);
            } else {
                cart.getItems().put(cartItem.getId(), cartItem);
            }
        } else {
            cart = new Cart();
            cart.setUserId(id);
            Map<String, CartItem> items = new HashMap<>();
            items.put(cartItem.getId(), cartItem);
            cart.setItems(items);
        }
        return new ResponseEntity<>(cartRepository.save(cart), HttpStatus.OK);
    }

    @DeleteMapping("/{id}/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable(name = "id") String id, @PathVariable(name = "cartItemId") String cartItemId) {
        Cart cart = cartRepository.findById(id).orElse(null);
        if(cart != null) {
            cart.getItems().remove(cartItemId);
            return new ResponseEntity<>(cartRepository.save(cart), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeCart(@PathVariable(name = "id") String id) {
        Cart cart = cartRepository.findById(id).orElse(null);
        if(cart != null) {
            cart.setItems(new HashMap<>());
            return new ResponseEntity<>(cartRepository.save(cart), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCart(@PathVariable String id) {
        Cart cart = cartRepository.findById(id).orElse(null);
        if(cart != null) {
            return new ResponseEntity<>(cart.getItems().keySet().stream()
                    .map(x -> cart.getItems().get(x)).toList(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
    }
}
