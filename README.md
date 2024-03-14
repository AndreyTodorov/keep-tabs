# keep-tabs

## TODO

0. [x] Add the amount input componenent

1. [x] Add new Tab in the DB

   - [x] add "create/edit Tab modal"
   - [ ] the final design of the overview Tab
     - [ ] show users
     - [ ] current balance
   - [ ] page to view single TAB

2. [x] Seeders

   1. [x] users
   2. [x] tabs
   3. [x] transactions

3. [ ] add cronjon to update the current months balance and amount
4. [ ] Create Tab

   - [ ] enter the email of the users
   - [ ] create tab_confirmation_queue
     - [ ] id,tab_id,user_id, email_sent_at, status
   - [ ] Status of the tab is pending until answer is received
   - [ ] send email for acceptance/decline
   - [ ] set status of the tab

5. [ ] Add new Transaction to a TAB

   - [x] add "create/edit Transaction modal"
   - [x] add Types to transactions: addition,correction
   - [ ] on delete:
     - [ ] set the current field deleted_at
     - [ ] Create new transaction with action correction
   - [ ] Add rebalance button
   - [ ] Add categories such as: Food, Bills, Rebalance

6. [x] add error messages for BE errors on inertia
7. [ ] Build docker image on new release

   - [ ] use watchtower or appleboys actions

8. [ ] Add React Query
9. [ ] add Categories
