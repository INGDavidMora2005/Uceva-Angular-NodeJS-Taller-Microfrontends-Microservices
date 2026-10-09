export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';

export interface Course {
  id: number;
  name: string;
  teacher: string;
  credits: number;
  semester: number;
  modality: CourseModality;
}