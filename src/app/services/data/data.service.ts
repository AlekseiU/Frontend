import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { DataComponent } from '../../components/data/data.component';

@Injectable()
export class DataService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private apiUrl = 'api/data';  // URL to web api
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}  	

	constructor(
		private http: Http
	){}

	// getAll(): Promise<DataComponent[]> {
	// 		return this.http.get(this.apiUrl)
	// 						.toPromise()
	// 						.then(response => response.json().data as DataComponent[])
	// 						.catch(this.handleError);		
	// }

	getByProject(id: number) {
		return this.http.get(this.apiUrl)
					.map(response => response.json().data.filter(d => d.project === id))
					.catch(this.handleError);
	}

	delete(id: number) {
		const url = `${this.apiUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
					.map(response => response.json())
					.catch(this.handleError);
					// .toPromise()
					// .then(() => null)
					// .catch(this.handleError);
	}  	

	create(name: string, projectId: number): Observable<DataComponent> {
		return this.http.post(
						this.apiUrl, 
						JSON.stringify({
							name: name,
							coordinates: {
								x: null,
								y: null
							},
							fullScreen: false,
							project: projectId,
							content: []
						}), 
						{headers: this.headers}
					)
					.map(response => response.json().data)
					.catch(this.handleError);
	}

	update(data: DataComponent): Observable<DataComponent> {
		const url = `${this.apiUrl}/${data.id}`;
		return this.http
					.put(
						url, 
						JSON.stringify(data), 
						{headers: this.headers}
					)
					.map(() => data)
					.catch(this.handleError);
	}  	

		// toggleFullScreen(data: DataComponent):void {
		// 	data.fullScreen = !data.fullScreen;
		// }
}
