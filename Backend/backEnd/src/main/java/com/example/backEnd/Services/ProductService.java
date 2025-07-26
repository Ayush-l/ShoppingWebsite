package com.example.backEnd.Services;


import com.example.backEnd.Entities.Product;
import com.example.backEnd.Entities.Review;
import com.example.backEnd.Repositories.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public boolean createProduct(Product product){
        product.setDiscountPer(100*(product.getPrice()-product.getDiscountedPrice())/product.getPrice());
        productRepository.save(product);
        return true;
    }

    public boolean deleteProduct(Integer id){
        if(productRepository.findById(id).isEmpty()) return false;
        productRepository.deleteById(id);
        return true;
    }

    public boolean updateProduct(Integer id,Product product){
        Optional<Product> p=productRepository.findById(id);
        if(p.isEmpty()) return false;
        Product savedProduct=p.get();
        savedProduct.setBrand(product.getBrand());
        savedProduct.setTitle(product.getTitle());
        savedProduct.setPrice(product.getPrice());
        savedProduct.setColor(product.getColor());
        savedProduct.setImageUrl(product.getImageUrl());
        savedProduct.setQuantity(product.getQuantity());
        savedProduct.setDiscountedPrice(product.getDiscountedPrice());
        savedProduct.setSecondLevelCategory(product.getSecondLevelCategory());
        savedProduct.setDiscountPer(100*(product.getPrice()-product.getDiscountedPrice())/product.getPrice());
        savedProduct.setTopLevelCategory(product.getTopLevelCategory());
        savedProduct.setThirdLevelCategory(product.getThirdLevelCategory());
        savedProduct.setDescription(product.getDescription());
        productRepository.save(savedProduct);
        return true;
    }

    public Product findProduct(Integer id){
        return productRepository.findById(id).get();
    }

    public List<Review> getAllReviews(Integer productId){
        Product product=productRepository.findById(productId).get();
        if(product==null) return null;
        return product.getReviews();
    }

    public List<Product> findProdByCat(String category1,String category2,String category3){
        List<Product> allProducts=productRepository.findAll();
        List<Product> toReturn=new ArrayList<>();
        if(!category3.isEmpty()) {
            for (Product p : allProducts) {
                if (p.getThirdLevelCategory().equals(category3) && p.getSecondLevelCategory().equals(category2) && p.getTopLevelCategory().equals(category1))
                    toReturn.add(p);
            }
        }
        else if(!category2.isEmpty()){
            for(Product p:allProducts) {
                if (p.getSecondLevelCategory().equals(category2) && p.getTopLevelCategory().equals(category1))
                    toReturn.add(p);
            }
        }
        else if(!category1.isEmpty()){
            for(Product p:allProducts) {
                if (p.getTopLevelCategory().equals(category1)) toReturn.add(p);
            }
        }
        else return allProducts;
        return toReturn;
    }

    public Page<Product> getAllProducts(String category1,String category2,String category3, List<String> colors, List<Boolean> sizes, int minPrice, int maxPrice, int minDiscount, int sort, Boolean stock, int pageNumber, int pageSize){
        Pageable pageable= PageRequest.of(pageNumber,pageSize);
        Query query=new Query();
        query.addCriteria(Criteria.where("price").gte(minPrice).lte(maxPrice));
        if(!category1.isEmpty()){
            query.addCriteria(Criteria.where("topLevelCategory").is(category1));
            if(!category2.isEmpty()){
                query.addCriteria(Criteria.where("secondLevelCategory").is(category2));
                if(!category3.isEmpty()){
                    query.addCriteria(Criteria.where("thirdLevelCategory").is(category3));
                }
            }
        }
        if(minDiscount!=0) query.addCriteria(Criteria.where("discountPer").gte(minDiscount));
        List<Product> allProducts=mongoTemplate.find(query,Product.class);
        List<Product> toReturn=new ArrayList<>();
        for(Product p:allProducts){
            if(!colors.contains(p.getColor())) continue;
            boolean fb=false;
            for(int i=0;i<10;i++){
                if(sizes.get(i)&&p.getSizes().get(i)){
                    fb=true;
                    break;
                }
            }
            if(fb||Boolean.TRUE.equals(!stock)) toReturn.add(p);
        }
        if(sort>0) toReturn.sort(Comparator.comparing(Product::getPrice));
        if(sort==2) Collections.reverse(toReturn);
        int stIdx=(int)pageable.getOffset();
        int endIdx=Math.min(stIdx+pageSize, toReturn.size());
        List<Product> pageContent=toReturn.subList(stIdx,endIdx);
        return new PageImpl<>(pageContent,pageable,toReturn.size());
    }

    public List<Product> getAll(){
        return productRepository.findAll();
    }

}
