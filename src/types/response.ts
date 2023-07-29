export enum ResponseStatus {
	SUCCESS = 'True',
	FAILED = 'False',
}

interface ISuccessResponse {
	Response: ResponseStatus.SUCCESS;
	Search: Movie[];
	totalResults: string;
}

interface IFailedResponse {
	Response: ResponseStatus.FAILED;
	Error: string;
}

export type Response = ISuccessResponse | IFailedResponse;
