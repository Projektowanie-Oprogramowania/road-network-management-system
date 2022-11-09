package pl.edu.pw.backend.point;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import pl.edu.pw.backend.infrastructure.Infrastructure;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private double x;
    @NonNull
    private double y;
}
