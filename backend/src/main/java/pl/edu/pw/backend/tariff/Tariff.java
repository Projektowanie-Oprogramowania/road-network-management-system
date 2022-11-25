package pl.edu.pw.backend.tariff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tariff {
    @GeneratedValue
    @Id
    private Long id;

    private Date creationDate;

    private String name;

    @ElementCollection
    @CollectionTable(name = "price",
            joinColumns = { @JoinColumn(name = "tariff_id") })
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "name")
    @Column(name = "price")
    private Map<VehicleCategory, Double> pricesPerKilometer;

    public Tariff(Date creationDate, String name, Map<VehicleCategory, Double> pricesPerKilometer) {
        this.creationDate = creationDate;
        this.name = name;
        this.pricesPerKilometer = pricesPerKilometer;
    }
}
