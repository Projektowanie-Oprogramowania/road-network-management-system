package pl.edu.pw.backend.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import pl.edu.pw.backend.point.Point;
import main.java.pl.edu.pw.backend.infrastructure.InfrastructureType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Infrastructure {
    private String name;
    private Point location;
    private InfrastructureType type;
}
