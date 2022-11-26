package pl.edu.pw.backend.charge;

import javax.persistence.*;

import lombok.*;

import java.util.Date;


@Table(name = "charges")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Charge {
    public Charge(double amount, String description, Date date, String chargeType, int userID, boolean isPaid) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.chargeType = chargeType;
        this.userID = userID;
        this.isPaid = isPaid;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NonNull
    private double amount;

    private String description;

    private Date date;

    private String chargeType;

    @NonNull
    private int userID;

    @NonNull
    private boolean isPaid;

}
