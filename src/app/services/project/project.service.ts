import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ProjectComponent } from '../../components/project/project.component';

@Injectable()
export class ProjectService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private apiUrl = 'api/projects';  // URL to web api
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}  	

	constructor(
		private http: Http
	){}

	getProjects(): Observable<ProjectComponent[]> {
		return this.http.get(this.apiUrl)
					.map(response => response.json().data)
					.catch(this.handleError);
							// .toPromise()
							// .subscribe(response => response.json().data as ProjectComponent[])				
	}

	getProject(id: number): Observable<ProjectComponent> {
		const url = `${this.apiUrl}/${id}`;
			return this.http.get(url)
					.map(response => response.json().data)
					.catch(this.handleError);
					// .toPromise()
					// .then(response => response.json().data as ProjectComponent)
						
	}

		// delete(id: number): Promise<void> {
		// 	const url = `${this.apiUrl}/${id}`;
		// 	return this.http.delete(url, {headers: this.headers})
		// 				.toPromise()
		// 				.then(() => null)
		// 				.catch(this.handleError);
		// }	

	create(name: string): Observable<ProjectComponent> {
		return this.http
					.post(
						this.apiUrl, 
						JSON.stringify({
							name: name,
							pages: 0
						}), 
						{headers: this.headers}
					)
					.map(response => response.json().data as ProjectComponent)
					.catch(this.handleError);
					// .toPromise()
					// .then(result => result.json().data as ProjectComponent)
					// .catch(this.handleError);
	}

		// update(project: ProjectComponent): Promise<ProjectComponent> {
		// 	const url = `${this.apiUrl}/${project.id}`;
		// 	return this.http
		// 				.put(
		// 					url, 
		// 					JSON.stringify(project), 
		// 					{headers: this.headers}
		// 				)
		// 				.toPromise()
		// 				.then(() => project)
		// 				.catch(this.handleError);
		// }
}