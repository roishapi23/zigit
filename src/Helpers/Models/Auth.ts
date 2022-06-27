import { PersonalDetails } from "./PersonalDetails"

export interface Auth {
    token: string | null,
    personalDetails: PersonalDetails | null   
}