package com.example.backEnd.Entities;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "paymentDetails")
public class PaymentDetails {

    private PaymentMethod paymentMethod;
    private boolean isPaid;
    private String paymentId;
    private String razorPayPaymentLinkReferenceLinkId;
    private String razorPayPaymentLinkReferenceId;
    private String razorPayPaymentLinkStatus;
    private String razorPayPaymentId;
}
