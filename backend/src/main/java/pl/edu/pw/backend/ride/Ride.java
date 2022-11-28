package pl.edu.pw.backend.ride;


import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import pl.edu.pw.backend.segment.Segment;

@Entity
@NoArgsConstructor
@Getter
@Setter
class Ride {

    @GeneratedValue
    @Id
    private int id;

    private int chargeID;

    private Date endDate;

    private Date startDate;

    @ManyToMany
    @Cascade(CascadeType.SAVE_UPDATE)
    private List<Segment> segments;

    private String carRegistrationNumber;

    public Ride(int chargeID, Date endDate, Date startDate,
        List<Segment> segments, String carRegistrationNumber) {
        this.chargeID = chargeID;
        this.endDate = endDate;
        this.startDate = startDate;
        this.segments = segments;
        this.carRegistrationNumber = carRegistrationNumber;
    }

}
