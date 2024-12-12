/**
 * admin 등록시 회원 정보 조회 api 타입
 */
export interface GetMemberInfoByJoinApiType {
  id: string;
  name: string;
  birthDt: string;
  degree: string;
}

/**
 * 레벨 조회 api 타입
 */
export interface GetLevelsType {
  id: string;
  level: string;
  color: string;
}

/**
 * 기수 조회 api 타입
 */
export interface GetDegreesType {
  id: string;
  degree: string;
  description?: string;
}

/**
 * 어드민 조회 api 타입
 */
export interface GetAdminsType {
  id: string;
  name: string;
  memberId: string;
  birthDt: string;
  level: string;
  color: string;
  degree: string;
  phoneNo: string;
  grade: string;
}

/**
 * 벙 조회 api 타입
 */
export interface GetMeetingType {
  id: string;
  meetingName: string;
  hostName: string;
  climbingAreaName: string;
  address: string;
  winwinYn: string;
  price: string;
  winPrice: string;
  hostDt: string;
  time: string;
  criticalMeetingYn: string;
  status: string;
  updater: string;
}

/**
 * 참가자 조회 api 타입
 */
export interface GetParticipantType {
  id: string;
  name: string;
  level: string;
  color: string;
}
