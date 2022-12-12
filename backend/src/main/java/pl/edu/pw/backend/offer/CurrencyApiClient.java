package pl.edu.pw.backend.offer;


import java.math.BigDecimal;
import java.util.Objects;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

class CurrencyApiClient {

    private static final String URL = "https://api.apilayer.com/exchangerates_data/convert?to=PLN&from=%s&amount=%s";

    private final RestTemplate restTemplate;
    private final HttpHeaders headers;

    CurrencyApiClient() {
        this.restTemplate = new RestTemplate();
        this.headers = new HttpHeaders();
        headers.add("apikey", "pVgzQmuocq06NlzD5yWOpg8W2pvEAUHB");
    }


    BigDecimal getCurrencyRate(Currency currency, BigDecimal amount) {
        HttpEntity<String> requestEntity = new HttpEntity<>("", headers);
        String url = String.format(URL, currency.getName(), amount);
        ResponseEntity<CalculationResponse> response = restTemplate.exchange(
                url, HttpMethod.GET, requestEntity, CalculationResponse.class);
        return Objects.requireNonNull(response.getBody()).getResult();
    }
}
