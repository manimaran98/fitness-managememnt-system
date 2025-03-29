package springboot.backend.fitness.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.backend.fitness.exception.UserNotFoundException;
import springboot.backend.fitness.model.Member;
import springboot.backend.fitness.repo.MemberRepo;

import java.util.List;

@Service
@Transactional
public class MemberService {
    private final MemberRepo memberRepo;

    @Autowired
    public MemberService(MemberRepo memberRepo) {
        this.memberRepo = memberRepo;
    }

    public Member addMember(Member member) {
        return memberRepo.save(member);
    }

    public List<Member> findAllMembers() {
        return memberRepo.findAll();
    }

    public Member updateMember(Member member) {
        return memberRepo.save(member);
    }

    public Member findMemberById(Long id) {
        return memberRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Member with ID " + id + " was not found"));
    }

    public void deleteMember(Long id) {
        memberRepo.deleteById(id);
    }
}
