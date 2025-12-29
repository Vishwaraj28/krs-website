"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Edit,
  Trash2,
  Phone,
  ChevronDown,
  ChevronUp,
  Calendar,
  HeartPulse,
} from "lucide-react";
import { FlexBox } from "../layout/FlexBox";
import { FamilyMember } from "@/types/form-types";
import profilePlaceholderImage from "@/assets/profile-placeholder.svg";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/utils";

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (member: FamilyMember) => void;
}

interface InfoListProps {
  data: Record<string, string | undefined | null>; // object of label: value
  heading?: string; // optional section title
  className?: string;
}

/**
 * Renders a vertical list of label/value pairs.
 */
export const InfoList: React.FC<InfoListProps> = ({
  data,
  heading,
  className,
}) => {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      {heading && <h4 className="text-base">{heading}</h4>}

      {Object.entries(data)
        // .filter(([_, value]) => value)
        .map(([label, value]) => (
          <FlexBox
            key={label}
            firstColWidth="25"
            secondColWidth="73"
            className="mb-1.25 items-start gap-2 pl-2"
          >
            <p className="text-sm text-primary">{label}:</p>
            <p className="text-sm">{value}</p>
          </FlexBox>
        ))}
    </div>
  );
};

export function FamilyMemberCard({
  member,
  onEdit,
  onDelete,
}: FamilyMemberCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    firstName,
    lastName,
    // photo,
    relation,
    dob,
    bloodGroup,
    phone,
    maritalStatus,
    mosalName,
    mosalAddress,
    svasurName,
    svasurAddress,
    qualification,
    institution,
    profession,
    jobTitle,
    employerName,
    industry,
    created_at,
    updated_at,
  } = member;
  const fullName = `${firstName} ${lastName}`.trim();
  return (
    <Card className="p-0 pt-3 border-0 gap-5">
      <FlexBox className="px-3 justify-between">
        <Badge shape="square">{relation}</Badge>
        <FlexBox className="gap-3 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(member)}
            className="h-8 w-8 p-0 text-primary hover:text-white hover:bg-primary border border-primary"
          >
            <Edit />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(member)}
            className="h-8 w-8 p-0 text-primary hover:text-white hover:bg-primary border border-primary"
          >
            <Trash2 />
          </Button>
        </FlexBox>
      </FlexBox>

      <div className="px-3">
        <FlexBox className="gap-4" firstColWidth="30" secondColWidth="65">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-primary-light bg-muted/30">
            <img
              // src={photo || profilePlaceholderImage}
              src={profilePlaceholderImage}
              alt={`${fullName} photo`}
              className="object-cover h-full w-full"
            />
          </div>
          <FlexBox orientation="column" className="items-start gap-0">
            <h4 className="text-primary text-2xl">{fullName}</h4>
            <Badge variant="ghost" className="text-sm p-0.2">
              <Calendar className="text-primary" /> {dob}
            </Badge>
            <Badge variant="ghost" className="text-sm p-0.2">
              <HeartPulse className="text-primary" /> {bloodGroup}
            </Badge>
            {phone && (
              <Badge variant="ghost" className="text-sm p-0.2">
                <Phone className="text-primary" /> {phone}
              </Badge>
            )}
          </FlexBox>
        </FlexBox>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <div className="bg-primary-light p-3">
            <InfoList
              heading="વ્યક્તિગત માહિતી"
              data={{
                "Marital Status": maritalStatus,
                "Mosal Name": mosalName,
                "Mosal Address": mosalAddress,
                "Svasur Name": svasurName,
                "Svasur Address": svasurAddress,
              }}
            />
            <Separator className="my-5 bg-primary" />
            <InfoList
              heading="શિક્ષણ અને વ્યાવસાયિક માહિતી"
              data={{
                Qualification: qualification,
                Institution: institution,
                Profession: profession,
                "Job Title": jobTitle,
                Employer: employerName,
                Industry: industry,
              }}
            />
          </div>
        </CollapsibleContent>

        {/* Expandable Section Trigger */}
        <CollapsibleTrigger asChild>
          <div className="flex justify-between p-3">
            <div>
              {isOpen && (
                <>
                  <p className="text-gray-500 text-[12px]">
                    Member Added: {formatDate(created_at ?? "")}
                  </p>
                  <p className="text-gray-500 text-[12px]">
                    Last Updated: {formatDate(updated_at ?? "")}
                  </p>
                </>
              )}
            </div>
            <Button
              size="sm"
              className="bg-primary-light text-black hover:bg-primary-light"
            >
              {isOpen ? "ઓછી માહિતી" : "વધુ માહિતી"}
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CollapsibleTrigger>
      </Collapsible>
    </Card>
  );
}
