public class PaginationList {

    @AuraEnabled
    public static List<Contact> getRecords() {
        return [Select Id, Name, Email from Contact order by Name];
    }
}