package com.example.backEnd.Controllers;


import com.example.backEnd.Entities.Product;
import com.example.backEnd.Services.ProductService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<Boolean> createProduct(@RequestBody Product product){
        productService.createProduct(product);
        return new ResponseEntity<>(true, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Boolean> updateProduct(@PathVariable Integer id,@RequestBody Product product){
        if(productService.updateProduct(id,product)) return new ResponseEntity<>(true,HttpStatus.ACCEPTED);
        return new ResponseEntity<>(false,HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id){
        if(productService.deleteProduct(id)) return new ResponseEntity<>(HttpStatus.ACCEPTED);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Integer id){
        Product product=productService.findProduct(id);
        if(product==null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @GetMapping("/getAll/{category1}/{category2}/{category3}")
    public ResponseEntity<List<Product>> getAllProductByCategory(@PathVariable String category1,@PathVariable String category2,@PathVariable String category3){
        return new ResponseEntity<>(productService.findProdByCat(category1,category2,category3),HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<ArrayList<Product>> getAll(){
        ArrayList<Product> p=new ArrayList<>(productService.getAll());
        return new ResponseEntity<>(p,HttpStatus.OK);
    }

}
