package pl.edu.pw.backend.charge;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChargeDTO {
    int id;
    double amount;
    String description;
    Date date;
    String chargeType;
    int userID;
    boolean isPaid;
}
