package pl.edu.pw.backend.offer;

import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
class CurrencyMapper {

    static BigDecimal map(Currency currency, BigDecimal amount) {
        return new CurrencyApiClient().getCurrencyRate(currency, amount);
    }


}
