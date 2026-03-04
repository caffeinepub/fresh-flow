import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

// Apply migration during upgrade
(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Quote Request System
  public type QuoteRequest = {
    id : Nat;
    name : Text;
    businessName : Text;
    businessType : Text;
    city : Text;
    monthlyQuantity : Text;
    brandingNotes : Text;
    email : Text;
    phone : Text;
    submissionTime : Int;
    status : QuoteStatus;
  };

  public type QuoteStatus = {
    #new;
    #contacted;
    #pending;
    #finalized;
  };

  let quotes = Map.empty<Nat, QuoteRequest>();
  var nextId = 0;

  // Public function - anyone can submit a quote request (including guests)
  public shared ({ caller }) func submitQuoteRequest(
    name : Text,
    businessName : Text,
    businessType : Text,
    city : Text,
    monthlyQuantity : Text,
    brandingNotes : Text,
    email : Text,
    phone : Text,
  ) : async Nat {
    let newQuote : QuoteRequest = {
      id = nextId;
      name;
      businessName;
      businessType;
      city;
      monthlyQuantity;
      brandingNotes;
      email;
      phone;
      submissionTime = Time.now();
      status = #new;
    };

    quotes.add(nextId, newQuote);
    nextId += 1;
    newQuote.id;
  };

  // Admin-only function - view all quote requests
  public query ({ caller }) func getAllQuotes() : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all quotes");
    };
    quotes.values().toArray();
  };

  // Admin-only function - update quote status
  public shared ({ caller }) func updateQuoteStatus(quoteId : Nat, newStatus : QuoteStatus) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update quote status");
    };

    switch (quotes.get(quoteId)) {
      case (null) { false };
      case (?existingQuote) {
        let updatedQuote = { existingQuote with status = newStatus };
        quotes.add(quoteId, updatedQuote);
        true;
      };
    };
  };
};
