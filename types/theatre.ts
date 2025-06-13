export interface TheatreGroup {
	city: string;
	cinemas: Theatre[];
}

export interface Theatre {
	ID: string;
	Name: string;
	PhoneNumber: string;
	City: string;
	Address1: string;
	Address2: string;
	LoyaltyCode: string;
	Latitude: string;
	Longitude: string;
	Description: string;
	Slug: string;
}