package com.admin.the_climbing_night.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.the_climbing_night.admin.domain.req.UpdateMemberRequest;
import com.admin.the_climbing_night.admin.vo.GetMemberVo;
import com.admin.the_climbing_night.admin.vo.IsMemberForAdminVo;
import com.admin.the_climbing_night.admin.domain.req.GetMembersRequest;
import com.admin.the_climbing_night.admin.domain.req.InsertMemberRequest;
import com.admin.the_climbing_night.admin.domain.req.IsAdminMemberRequest;
import com.admin.the_climbing_night.annotations.DatabaseCryptoAdviceAnnotation;

@Mapper
@Repository
public interface AdminMapper {
    @DatabaseCryptoAdviceAnnotation
    List<GetMemberVo> getMembers(GetMembersRequest req);

    @DatabaseCryptoAdviceAnnotation
    String isAdminMember(IsAdminMemberRequest req);

    @DatabaseCryptoAdviceAnnotation
    int updateAuthority(IsAdminMemberRequest req);

    @DatabaseCryptoAdviceAnnotation
    String isMember(IsMemberForAdminVo req);

    @DatabaseCryptoAdviceAnnotation
    int insertMember(InsertMemberRequest req);

    @DatabaseCryptoAdviceAnnotation
    int updateMember(UpdateMemberRequest req);
}
