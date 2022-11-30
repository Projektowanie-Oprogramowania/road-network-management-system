package pl.edu.pw.backend.subscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import pl.edu.pw.backend.charge.Charge;
import pl.edu.pw.backend.segment.Segment;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    public Subscription(int userID, List<Segment> segments, String description, Date startDate, Date endDate, Charge charge) {
        this.userID = userID;
        this.segments = segments;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.charge = charge;
    }

    @GeneratedValue
    @Id
    private int id;

    private int userID;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private List<Segment> segments;

    private String description;

    private Date startDate;

    private Date endDate;

    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Charge charge;

}
