import { Injectable } from '@angular/core'
import { HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class Utilities {

    token
    mail
    bar: Shop
    eventId
    barId
    city
    event: Event
    suggested: number
    user: User
    phoneToken: string

    getSuggestedQuatum() {
        return this.suggested
    }

    setTokenBar(phoneToken: string) {
        this.phoneToken = phoneToken
    }

    getBarToken(){
        return this.phoneToken
    }
    addSuggested(n) {
        this.setSuggested += n
    }

    setUser(user: User) {
        this.user = user
    }

    getUser() {
        return this.user
    }

    getEvent(): Event {
        return this.event
    }

    setSuggested(sug: number) {
        this.suggested = sug
    }
    setEvent(event: Event) {
        this.event = event
    }
    constructor() { }

    setToken(token) {
        this.token = token
    }

    setMail(mail) {
        this.mail = mail
    }

    setCity(site: any) {
        this.city = site
    }

    getCity() {
        return this.city
    }

    getToken() {
        return this.token
    }
    getMail() {
        return this.mail
    }

    setBar(bar) {
        this.bar = bar
    }

    getBar() {
        /*return {
            name: 'Victoria',
            nickname: 'victoria',
            description: 'el super waooooooooo',
            licenseNumber: 132132,
            barkind: 'discoteca bar',
            officeHours: 'jueves a domingo desde las 8pm'
            
        }*/
        return this.bar
    }

    setEventId(idEvent: string) {
        this.eventId = idEvent
    }

    getEventId() {
        return this.eventId
    }

    getShopId() {
        return this.barId
    }

    setShopId(id: String) {
        this.barId = id
    }

    getOptionsHeaders() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true' });
        return { headers: headers };
    }
}