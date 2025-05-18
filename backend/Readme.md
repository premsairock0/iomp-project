You're using separate adminAuth and wardenAuth middleware.
admin and Warden login returns a token (JWT or any other).
you use Authorization: Bearer <token> in headers.

END POINT : POST /admin/notifications
Headers for this endpoint :
    Authorization: Bearer <admin-token>
    Content-Type: application/json
                body.json({
                    "headline": "Hostel Electricity Maintenance on Saturday"
                })


CLOSING THE NOTIFICATION 
PUT /admin/notifications/<notification_id>/close
Headers for this endpoint :
    Authorization: Bearer <admin-token>
    No body needed !!!
    notification id chusko ra mongo nunchi
