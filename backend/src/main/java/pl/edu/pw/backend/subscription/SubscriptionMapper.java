package pl.edu.pw.backend.subscription;

import pl.edu.pw.backend.charge.ChargeMapper;
import pl.edu.pw.backend.segment.Segment;
import pl.edu.pw.backend.segment.SegmentMapper;

import java.util.List;
import java.util.stream.Collectors;

public class SubscriptionMapper {

    public static Subscription map(AddSubscriptionDTO addSubscription, List<Segment> segments) {
        return new Subscription(
                addSubscription.userID,
                segments,
                addSubscription.getDescription(),
                addSubscription.getStartDate(),
                addSubscription.getEndDate(),
                ChargeMapper.map(addSubscription.charge)
        );
    }

    public static SubscriptionDTO map(Subscription subscription) {
        return new SubscriptionDTO(
                subscription.getId(),
                subscription.getUserID(),
                SegmentMapper.map(subscription.getSegments()),
                subscription.getDescription(),
                subscription.getStartDate(),
                subscription.getEndDate(),
                ChargeMapper.map(subscription.getCharge())
        );
    }

    public static List<SubscriptionDTO> map(List<Subscription> subscriptions) {
        return subscriptions
                .stream()
                .map(SubscriptionMapper::map)
                .collect(Collectors.toList());
    }
}
