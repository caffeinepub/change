import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";

actor {
  type UserProfile = {
    principal : Principal;
    balance : Nat;
    joinDate : Time.Time;
  };

  type Task = {
    id : Nat;
    description : Text;
    reward : Nat;
    completedBy : List.List<Principal>;
  };

  type Transaction = {
    user : Principal;
    taskId : Nat;
    amount : Nat;
    timestamp : Time.Time;
  };

  module Transaction {
    public func compare(t1 : Transaction, t2 : Transaction) : Order.Order {
      Nat.compare(t1.taskId, t2.taskId);
    };
  };

  let users = Map.empty<Principal, UserProfile>();
  let tasks = Map.empty<Nat, Task>();
  let transactions = Map.empty<Principal, List.List<Transaction>>();
  var nextTaskId = 0;

  public shared ({ caller }) func registerUser() : async () {
    if (users.containsKey(caller)) {
      Runtime.trap("User already registered");
    };

    let newUser : UserProfile = {
      principal = caller;
      balance = 10;
      joinDate = Time.now();
    };
    users.add(caller, newUser);

    let signupBonusTransaction : Transaction = {
      user = caller;
      taskId = 0;
      amount = 10;
      timestamp = Time.now();
    };

    let userTransactions = List.empty<Transaction>();
    userTransactions.add(signupBonusTransaction);
    transactions.add(caller, userTransactions);
  };

  public shared ({ caller }) func addTask(description : Text, reward : Nat) : async () {
    if (not users.containsKey(caller)) {
      Runtime.trap("Only registered users can add tasks");
    };
    let task : Task = {
      id = nextTaskId;
      description;
      reward;
      completedBy = List.empty<Principal>();
    };
    tasks.add(nextTaskId, task);
    nextTaskId += 1;
  };

  public shared ({ caller }) func completeTask(taskId : Nat) : async () {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) {
        switch (tasks.get(taskId)) {
          case (null) { Runtime.trap("Task not found") };
          case (?task) {
            if (task.completedBy.any(func(p) { p == caller })) {
              Runtime.trap("Task already completed by user");
            };
            let updatedTask : Task = {
              id = task.id;
              description = task.description;
              reward = task.reward;
              completedBy = List.fromIter(task.completedBy.values());
            };
            updatedTask.completedBy.add(caller);
            tasks.add(taskId, updatedTask);

            let updatedUser : UserProfile = {
              principal = user.principal;
              balance = user.balance + task.reward;
              joinDate = user.joinDate;
            };
            users.add(caller, updatedUser);

            let transaction : Transaction = {
              user = caller;
              taskId;
              amount = task.reward;
              timestamp = Time.now();
            };
            let userTransactions = switch (transactions.get(caller)) {
              case (null) { List.empty<Transaction>() };
              case (?list) { list };
            };
            userTransactions.add(transaction);
            transactions.add(caller, userTransactions);
          };
        };
      };
    };
  };

  public query ({ caller }) func getTransactions() : async [Transaction] {
    let userTransactions = switch (transactions.get(caller)) {
      case (null) { List.empty<Transaction>() };
      case (?list) { list };
    };
    userTransactions.toArray().sort();
  };

  public query ({ caller }) func getProfile() : async UserProfile {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?profile) { profile };
    };
  };
};
