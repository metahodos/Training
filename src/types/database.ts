export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    role_preference: 'SM' | 'PO' | null
                    xp_points: number
                    created_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    role_preference?: 'SM' | 'PO' | null
                    xp_points?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    role_preference?: 'SM' | 'PO' | null
                    xp_points?: number
                    created_at?: string
                }
            }
            scenarios: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    role_target: 'SM' | 'PO' | null
                    difficulty: 'Junior' | 'Mid' | 'Senior' | null
                    initial_context: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    role_target?: 'SM' | 'PO' | null
                    difficulty?: 'Junior' | 'Mid' | 'Senior' | null
                    initial_context?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    role_target?: 'SM' | 'PO' | null
                    difficulty?: 'Junior' | 'Mid' | 'Senior' | null
                    initial_context?: string | null
                    created_at?: string
                }
            }
            user_attempts: {
                Row: {
                    id: string
                    user_id: string
                    scenario_id: string
                    score: number | null
                    ai_feedback: Json | null
                    chat_transcript: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    scenario_id: string
                    score?: number | null
                    ai_feedback?: Json | null
                    chat_transcript?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id: string
                    scenario_id: string
                    score?: number | null
                    ai_feedback?: Json | null
                    chat_transcript?: Json | null
                    created_at?: string
                }
            }
        }
    }
}
