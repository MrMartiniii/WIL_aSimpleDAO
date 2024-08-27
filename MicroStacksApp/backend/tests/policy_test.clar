;; policy_test.clar

;; Import the contract to test
(use-trait test-helpers "ST000000000000000000002AMW42H.policy")

;; Define the test cases
(begin
  ;; Initialize the contract with members and votes required
  (let
    (
      (members [(tx-sender)])
      (votes-required u1)
    )
    (start members votes-required)
  )

  ;; Test creating a policy
  (create-policy "Test Policy" u500)

  ;; Check that the policy was created
  (let ((policy (map-get? policies tx-sender)))
    (asserts! (is-some policy) (err u106))
    (let ((policy-record (unwrap! policy (err u107)))
          (message (get message policy-record))
          (amount (get amount policy-record)))
      (asserts! (is-eq message "Test Policy") (err u108))
      (asserts! (is-eq amount u500) (err u109))
    )
  )

  ;; Cast a vote
  (vote tx-sender true)

  ;; Test withdrawal
  (let ((result (withdraw)))
    (asserts! (is-eq result u1) (err u110))
  )
)