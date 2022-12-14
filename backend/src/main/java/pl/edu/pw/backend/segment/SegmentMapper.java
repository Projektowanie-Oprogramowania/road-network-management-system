package pl.edu.pw.backend.segment;

import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.point.PointMapper;
import pl.edu.pw.backend.tariff.Tariff;
import pl.edu.pw.backend.tariff.TariffDTO;
import pl.edu.pw.backend.tariff.TariffMapper;
import pl.edu.pw.backend.tariff.TariffService;

import java.util.List;
import java.util.stream.Collectors;

public class SegmentMapper {

    private SegmentMapper() {
    }


    public static List<SegmentDTO> map(List<Segment> segments) {
        return segments
            .stream().map(SegmentMapper::map)
            .collect(Collectors.toList());
    }

    public static List<Segment> mapDTO(List<SegmentDTO> segments) {
        return segments
            .stream().map(SegmentMapper::map)
            .collect(Collectors.toList());
    }

    public static Segment map(SegmentDTO segment) {
        List<Point> points = PointMapper.mapDTO(segment.getPoints());
        Point startingPointDTO = PointMapper.map(segment.getStartingPoint());
        Point endingPointDTO = PointMapper.map(segment.getEndingPoint());
        Tariff tariff = TariffMapper.map(segment.getTariffDTO());
        return new Segment(points, startingPointDTO, endingPointDTO, tariff);
    }

    public static SegmentDTO map(Segment segment) {
        int id = segment.getId();
        List<PointDTO> points = PointMapper.map(segment.getPoints());
        PointDTO startingPointDTO = PointMapper.map(segment.getStartingPoint());
        PointDTO endingPointDTO = PointMapper.map(segment.getEndingPoint());
        TariffDTO tariffDTO = TariffMapper.map(segment.getTariff());
        return new SegmentDTO(id, points, startingPointDTO, endingPointDTO, tariffDTO);
    }
}
