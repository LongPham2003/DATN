package com.example.shoes.controller;

import com.example.shoes.config.VNPAYConfig;

import com.example.shoes.dto.vnpay.response.TransactionStatus;
import com.example.shoes.dto.vnpay.response.VNPAYResponse;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/paymentvnpay")
public class PaymentVNPAYController {

    @GetMapping("/create-payment")
    public String creatPayment(String amount) throws UnsupportedEncodingException {


        String orderType = "other";
//        long amount = Integer.parseInt(request.getParameter("amount"))*100;
//        String bankCode = req.getParameter("bankCode");
        String vnp_TxnRef = VNPAYConfig.getRandomNumber(8);
   //     String vnp_IpAddr = VNPAYConfig.getIpAddress(request);
        String vnp_IpAddr = "127.0.0.1";


//        long amount = 1000000*100;

        String vnp_TmnCode = VNPAYConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPAYConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPAYConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(new BigDecimal(amount).multiply(BigDecimal.valueOf(100))));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_TxnRef);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_ReturnUrl", VNPAYConfig.vnp_ReturnUrl);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPAYConfig.hmacSHA512(VNPAYConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPAYConfig.vnp_PayUrl + "?" + queryUrl;

//        VNPAYResponse vnpayResponse = new VNPAYResponse();
//        vnpayResponse.setStatus("OK");
//        vnpayResponse.setMessage("thanh toán thành công");
//        vnpayResponse.setURL(paymentUrl);

        return paymentUrl;

    }

    @GetMapping("/payment-return")
    public Boolean transaction(
            @RequestParam(value = "vnp_Amount") String amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_OrderInfo") String order,
            @RequestParam(value = "vnp_ResponseCode") String response
    ) {
        if ("00".equals(response)) {
           return true;
        }  else {
            return false;
        }

    }

}
//http://localhost:5173/admin/payment
//// ?vnp_Amount=1000000&vnp_BankCode=VNPAY&vnp_CardType=QRCODE&vnp_OrderInfo=96398637&
//// vnp_PayDate=20241106195030&vnp_ResponseCode=24&vnp_TmnCode=W4S3TLV0&vnp_TransactionNo=0&vnp_TransactionStatus=02
//// &vnp_TxnRef=36
//// &vnp_SecureHash=34a91a15ff50b9575d24cf6c8994bba419af4986d3c6e2a7bc5508fcb8abfb693f05e003fdecc79c1545911f9d21b18423a6ca6b7f682638c140a0581de4a03c