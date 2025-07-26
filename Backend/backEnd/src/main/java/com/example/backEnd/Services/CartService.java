package com.example.backEnd.Services;


import com.example.backEnd.Entities.Cart;
import com.example.backEnd.Entities.CartItem;
import com.example.backEnd.Entities.Product;
import com.example.backEnd.Repositories.CartItemRepository;
import com.example.backEnd.Repositories.CartRepository;
import com.example.backEnd.Repositories.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService{
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    private int find(List<CartItem> cartItems,CartItem cartItem){
        int n=cartItems.size();
        for(int i=0;i<n;i++) {
            if (cartItems.get(i).getId() == cartItem.getId())
                return i;
        }
        return -1;
    }

    public ArrayList<CartItem> getItems(String email){
        return new ArrayList<>(cartRepository.findById(email).get().getCartItems());
    }

    public boolean addToCart(Integer productId,String email,int size){
        try{
            Cart cart=cartRepository.findById(email).get();
            Product product=productRepository.findById(productId).get();
            CartItem cartItem=new CartItem();
            cartItem.setId(cartItem.getVal());
            cartItem.setQuantity(1);
            cartItem.setItem(product);
            cartItem.setSize(size);
            int index=find(cart.getCartItems(),cartItem);
            System.out.println(index);
            if(index!=-1){
                CartItem c=cart.getCartItems().get(index);
                c.setQuantity(c.getQuantity()+1);
                cartItemRepository.save(c);
                cartRepository.save(cart);
            }
            else{
                cartItemRepository.save(cartItem);
                cart.addCartItem(cartItem);
                cartRepository.save(cart);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteFromCart(String email,Long cartItemId){
        try{
            Optional<CartItem> cartItemOpt=cartItemRepository.findById(cartItemId);
            if(cartItemOpt.isEmpty()) return false;
            CartItem cartItem=cartItemOpt.get();
            Cart cart=cartRepository.findById(email).get();
            cart.getCartItems().removeIf(cartItem1 -> cartItem1.getId()==cartItem.getId());
            cartRepository.save(cart);
            cartItemRepository.deleteById(cartItem.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void deleteCart(String email){
        Cart c=cartRepository.findById(email).get();
        c.setCartItems(new ArrayList<>());
        cartRepository.save(c);
    }

    public boolean changeQuantity(String email,Long cartItemId,boolean inc){
        try{
            Optional<CartItem> cartItemOpt=cartItemRepository.findById(cartItemId);
            if(cartItemOpt.isEmpty()) return false;
            CartItem cartItem=cartItemOpt.get();
            Cart cart=cartRepository.findById(email).get();
            int idx=find(cart.getCartItems(),cartItem);
            if(inc){
                if(productRepository.findById(cartItem.getItem().getId()).get().getQuantity().get(cartItem.getSize())>=cartItem.getQuantity()+1){
                    cartItem.setQuantity(cartItem.getQuantity()+1);
                    cartItemRepository.save(cartItem);
                }
                else return false;
            }
            else{
                if(cart.getCartItems().get(idx).getQuantity()==1){
                    cart.getCartItems().removeIf(cartItem1 -> cartItem1.getId()==cartItem.getId());
                    cartItemRepository.deleteById(cartItem.getId());
                    cartRepository.save(cart);
                }
                else{
                    cartItem.setQuantity(cartItem.getQuantity()-1);
                    cartItemRepository.save(cartItem);
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean updateCartItem(String email,int size,Long cartItemid){
        try{
            Cart cart=cartRepository.findById(email).get();
            CartItem cartItem=cartItemRepository.findById(cartItemid).get();
            int idx=find(cart.getCartItems(),cartItem);
            cart.getCartItems().get(idx).setSize(size);
            cartItemRepository.save(cartItem);
            cartRepository.save(cart);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
