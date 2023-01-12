package pl.edu.pw.backend.offer;

import java.math.BigDecimal;
import java.math.RoundingMode;

class CalculationResponse {

  private BigDecimal result;

    public BigDecimal getResult() {
        return result.setScale(2, RoundingMode.HALF_EVEN);
    }

}
