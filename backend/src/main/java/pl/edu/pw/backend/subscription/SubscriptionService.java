package pl.edu.pw.backend.subscription;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.charge.ChargeMapper;
import pl.edu.pw.backend.segment.Segment;
import pl.edu.pw.backend.segment.SegmentRepository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final SegmentRepository segmentRepository;

    @Transactional
    SubscriptionDTO addSubscription(AddSubscriptionDTO addSubscription) {
        Subscription subscription = SubscriptionMapper.map(addSubscription, (List<Segment>) segmentRepository.findAllById(addSubscription.segments));
        return SubscriptionMapper.map(subscriptionRepository.save(subscription));
    }

    @Transactional
    public SubscriptionDTO updateSubscription(AddSubscriptionDTO subscriptionDTO, int id) {
        Subscription subscription = subscriptionRepository.findById(id).orElseThrow();
        subscription.setUserID(subscriptionDTO.userID);
        subscription.setDescription(subscriptionDTO.description);
        subscription.setStartDate(subscriptionDTO.startDate);
        subscription.setEndDate(subscriptionDTO.endDate);
        subscription.setCharge(ChargeMapper.map(subscriptionDTO.charge));
        subscription.getSegments().clear();
        subscription.getSegments().addAll((Collection<Segment>) segmentRepository.findAllById(subscriptionDTO.segments));
        return SubscriptionMapper.map(subscriptionRepository.save(subscription));
    }

    void removeSubscription(int id) {
        subscriptionRepository.deleteById(id);
    }

    SubscriptionDTO getSubscription(int id) {
        Subscription subscription = subscriptionRepository.findById(id).orElseThrow();
        return SubscriptionMapper.map(subscription);
    }

    List<SubscriptionDTO> getSubscriptionsByUserID(int id) {
        return SubscriptionMapper.map(subscriptionRepository.findAllByUserID(id));
    }

}
