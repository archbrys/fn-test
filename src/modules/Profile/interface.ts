export interface IProfile {
  id: number;
  user_id: string;
  user_img: string;
  major: string;
  year: string;
  status: IProfileStatus[];
}

export interface IProfileStatus {
  date: string;
  type: number;
}
