package pl.edu.pw.backend.offer;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
enum Currency {

  PLN("PLN"),
  EUR("EUR"),
  USD("USD"),
  GBP("GBP");

  private final String name;

}
