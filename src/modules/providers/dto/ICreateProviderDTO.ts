import {ICreateUserDTO} from "@modules/users/dto/ICreateUserDTO";

export interface ICreateProviderDTO extends ICreateUserDTO {
	category_id: string
}
