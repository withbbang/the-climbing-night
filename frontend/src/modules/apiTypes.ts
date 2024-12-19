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
  startTime: string;
  endTime: string;
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

/**
 * 회원 조회 api 타입
 */
export interface GetMemberType {
  id: string;
  name: string;
  grade: string;
  degree: string;
  level: string;
  color: string;
  count_this_year: string;
  count_last_1_year: string;
  count_last_3_months: string;
}

/**
 * 참여한 벙 조회 api 타입
 */
export interface GetMeetingOfMemberType {
  id: string;
  meetingName: string;
  hostDt: string;
  startTime: string;
  endTime: string;
  criticalMeetingYn: string;
  hostName: string;
  climbingAreaName: string;
  winwinYn: string;
}

/**
 * 벙 정보 조회 api 타입
 */
export interface GetMeetingDetailType {
  meetingName: string;
  hostDt: string;
  startTime: string;
  endTime: string;
  criticalMeetingYn: string;
  status: string;
  winwinYn: string;
  climbingAreaName: string;
  hostName: string;
}

/**
 * 일반 회원이 조회할 때, 참가자 목록 조회 api 타입
 */
export interface GetParticipantForMeetingType {
  id: string;
  host: string;
  name: string;
  degree: string;
  level: string;
  color: string;
}

/**
 * 벙 스케쥴 조회 api 타입
 */
export interface GetScheduleType {
  id: string;
  meetingName: string;
  hostDt: string;
  startTime: string;
  endTime: string;
  criticalMeetingYn: string;
  meetingStatusFk: string;
  hostName: string;
  climbingAreaName: string;
  winwinYn: string;
  date?: string;
}
