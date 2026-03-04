import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  type QuoteRequest = {
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
    status : {
      #new;
      #contacted;
      #pending;
      #finalized;
    };
  };

  public type OldActor = {
    quotes : [QuoteRequest];
    nextId : Nat;
  };

  public type NewActor = {
    quotes : Map.Map<Nat, QuoteRequest>;
    nextId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let idToValuePairs = old.quotes.map<QuoteRequest, (Nat, QuoteRequest)>(
      func(q : QuoteRequest) { (q.id, q) }
    );
    let newQuotes = Map.fromIter<Nat, QuoteRequest>(idToValuePairs.values());
    { quotes = newQuotes; nextId = old.nextId };
  };
};
