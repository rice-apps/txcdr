export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Address: {
        Row: {
          censusBlock: string
          city: string
          id: number
          number: string
          state: string
          street: string
          type: string
          zipCode: string
        }
        Insert: {
          censusBlock: string
          city: string
          id?: number
          number: string
          state: string
          street: string
          type: string
          zipCode: string
        }
        Update: {
          censusBlock?: string
          city?: string
          id?: number
          number?: string
          state?: string
          street?: string
          type?: string
          zipCode?: string
        }
        Relationships: []
      }
      DisasterFormAnswer: {
        Row: {
          answer: string
          formQuestionId: number | null
          formResponseId: number | null
          id: number
        }
        Insert: {
          answer: string
          formQuestionId?: number | null
          formResponseId?: number | null
          id?: number
        }
        Update: {
          answer?: string
          formQuestionId?: number | null
          formResponseId?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "DisasterFormAnswer_formQuestionId_fkey"
            columns: ["formQuestionId"]
            isOneToOne: false
            referencedRelation: "DisasterFormQuestion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "DisasterFormAnswer_formResponseId_fkey"
            columns: ["formResponseId"]
            isOneToOne: false
            referencedRelation: "DisasterFormResponse"
            referencedColumns: ["id"]
          },
        ]
      }
      DisasterFormQuestion: {
        Row: {
          descriptionOne: string
          descriptionTwo: string
          eventId: number | null
          field: string
          id: number
          options: string[] | null
          questionType: number
          require: boolean
          sequence: number
          validation: string
        }
        Insert: {
          descriptionOne: string
          descriptionTwo: string
          eventId?: number | null
          field: string
          id?: number
          options?: string[] | null
          questionType: number
          require: boolean
          sequence: number
          validation: string
        }
        Update: {
          descriptionOne?: string
          descriptionTwo?: string
          eventId?: number | null
          field?: string
          id?: number
          options?: string[] | null
          questionType?: number
          require?: boolean
          sequence?: number
          validation?: string
        }
        Relationships: [
          {
            foreignKeyName: "DisasterFormQuestion_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
        ]
      }
      DisasterFormResponse: {
        Row: {
          eventOnAddressId: number | null
          id: number
          volunteerId: number | null
        }
        Insert: {
          eventOnAddressId?: number | null
          id?: number
          volunteerId?: number | null
        }
        Update: {
          eventOnAddressId?: number | null
          id?: number
          volunteerId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "DisasterFormResponse_eventOnAddressId_fkey"
            columns: ["eventOnAddressId"]
            isOneToOne: false
            referencedRelation: "EventsOnAddresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "DisasterFormResponse_volunteerId_fkey"
            columns: ["volunteerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Event: {
        Row: {
          createdAt: string
          description: string
          id: number
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description: string
          id?: number
          title: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string
          id?: number
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      EventsOnAddresses: {
        Row: {
          addressId: number | null
          assignedAt: string
          assignedBy: string
          eventId: number | null
          id: number
        }
        Insert: {
          addressId?: number | null
          assignedAt?: string
          assignedBy: string
          eventId?: number | null
          id?: number
        }
        Update: {
          addressId?: number | null
          assignedAt?: string
          assignedBy?: string
          eventId?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "EventsOnAddresses_addressId_fkey"
            columns: ["addressId"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EventsOnAddresses_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
        ]
      }
      Form: {
        Row: {
          ableToStayHome: boolean | null
          eventId: number | null
          floodWaterHeight: string | null
          id: number
          impacted: boolean | null
          needHelp: boolean | null
          primaryLanguage: string | null
          residentEmail: string | null
          residentName: string | null
          residentPhone: string | null
          roofDamaged: boolean | null
          userId: number | null
        }
        Insert: {
          ableToStayHome?: boolean | null
          eventId?: number | null
          floodWaterHeight?: string | null
          id?: number
          impacted?: boolean | null
          needHelp?: boolean | null
          primaryLanguage?: string | null
          residentEmail?: string | null
          residentName?: string | null
          residentPhone?: string | null
          roofDamaged?: boolean | null
          userId?: number | null
        }
        Update: {
          ableToStayHome?: boolean | null
          eventId?: number | null
          floodWaterHeight?: string | null
          id?: number
          impacted?: boolean | null
          needHelp?: boolean | null
          primaryLanguage?: string | null
          residentEmail?: string | null
          residentName?: string | null
          residentPhone?: string | null
          roofDamaged?: boolean | null
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Form_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Form_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          address: string | null
          email: string
          id: number
          isAuth: boolean
          name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          address?: string | null
          email: string
          id?: number
          isAuth?: boolean
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          address?: string | null
          email?: string
          id?: number
          isAuth?: boolean
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
      User2: {
        Row: {
          address: string | null
          email: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["Role"] | null
        }
        Insert: {
          address?: string | null
          email: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["Role"] | null
        }
        Update: {
          address?: string | null
          email?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["Role"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role: "USER" | "ADMIN" | "SUPERADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
